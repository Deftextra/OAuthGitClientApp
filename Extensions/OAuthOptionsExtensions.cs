using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OAuthGitClientApp.Extensions
{
    public static class OAuthOptionsExtensions
    {
        private static readonly Func<OAuthCreatingTicketContext, Task> GetGitHubUserClaims = async context =>
        {
            var request =
                new HttpRequestMessage(HttpMethod.Get, context.Options.UserInformationEndpoint);
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Headers.Authorization =
                new AuthenticationHeaderValue("Bearer", context.AccessToken);

            var response = await context.Backchannel.SendAsync(request,
                HttpCompletionOption.ResponseContentRead,
                context.HttpContext.RequestAborted);
            response.EnsureSuccessStatusCode();

            var json = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
            context.RunClaimActions(json.RootElement);
        };

        public static AuthenticationBuilder AddGitHubAuth(this IServiceCollection services,
            IConfiguration configuration)
        {
            return services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults .AuthenticationScheme;
                    options.DefaultSignInScheme = CookieAuthenticationDefaults .AuthenticationScheme;
                    options.DefaultChallengeScheme = "github";
                })
                .AddCookie()
                .AddOAuth("github",
                    options => options.AddGithubAuthOptions(configuration));
        }
        private static void AddGithubAuthOptions(this OAuthOptions options
            , IConfiguration configuration)
        {
            options.ClientId = configuration["github:clientId"];
            options.ClientSecret = configuration["GitHub:secret"];
            options.CallbackPath = new PathString("/github-oauth");
            options.AuthorizationEndpoint = "https://github.com/login/oauth/authorize";
            options.TokenEndpoint = "https://github.com/login/oauth/access_token";
            options.UserInformationEndpoint = "https://api.github.com/user";
            options.SaveTokens = true;
            options.ClaimActions.MapJsonKey(ClaimTypes.NameIdentifier, "id");
            options.ClaimActions.MapJsonKey(ClaimTypes.Name, "name");
            options.ClaimActions.MapJsonKey("urn:github:login", "login");
            options.ClaimActions.MapJsonKey("urn:github:url", "html_url");
            options.ClaimActions.MapJsonKey("urn:github:avatar", "avatar_url");
            options.Events = new OAuthEvents
            {
                OnCreatingTicket = GetGitHubUserClaims
            };
        }
    }
}