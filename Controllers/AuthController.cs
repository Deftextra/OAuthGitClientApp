using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

namespace OAuthGitClientApp.Controllers
{
    public class AuthController : ControllerBase
    {
        public IActionResult Login(string returnUrl = "/")
        {
            return Challenge(new AuthenticationProperties
            {
                RedirectUri = returnUrl
            });
        }
    }
}