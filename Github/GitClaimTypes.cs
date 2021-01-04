using System.Security.Claims;

namespace OAuthGitClientApp.Github
{
    public static class GitClaimTypes
    {
        public const string AvatarUrl = "urn:github:avatar";
        public const string Login = "urn:github:login";
        public const string Url = "urn:github:url";
    }
}