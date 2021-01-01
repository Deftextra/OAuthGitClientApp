using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OAuthGitClientApp.Github;

namespace OAuthGitClientApp.Components
{
    public class UserNavItem : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            var userAvatarUrl = string.Empty;
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                userAvatarUrl = UserClaimsPrincipal.Claims
                    .SingleOrDefault(cl => cl.Type == GitClaimTypes.AvatarUrl)
                    ?.Value;
            }

            return View(model: userAvatarUrl);
        }
    }
}