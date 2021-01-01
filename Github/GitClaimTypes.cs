using System.Security.Claims;

namespace OAuthGitClientApp.Github
{
    public static class GitClaimTypes
    {
        public const string Avatar= ClaimTypeNamespace + "/authenticationinstant";
        public const string AuthenticationMethod = ClaimTypeNamespace + "/authenticationmethod";
        public const string CookiePath = ClaimTypeNamespace + "/cookiepath";
    }
}