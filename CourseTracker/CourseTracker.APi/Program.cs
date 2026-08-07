
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace CourseTracker.APi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   var entra = builder.Configuration.GetSection("EntraId");
                   var tenantId = entra["TenantId"];
                   var apiClientId = entra["ApiClientId"];

                   options.Authority = $"https://login.microsoftonline.com/{tenantId}/v2.0";
                   options.Audience = $"{apiClientId}";
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       RoleClaimType = "roles",
                       NameClaimType = "name"
                   };

                   options.Events = new JwtBearerEvents
                   {
                       OnAuthenticationFailed = context =>
                       {
                           Console.WriteLine("AUTH FAILED: " + context.Exception);
                           return Task.CompletedTask;
                       },
                       OnChallenge = context =>
                       {
                           Console.WriteLine("CHALLENGE: " + context.ErrorDescription);
                           return Task.CompletedTask;
                       }
                   };
               });
            builder.Services.AddAuthorization();
            // Add Swashbuckle/Swagger services
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            // Redirect root to Swagger UI
            app.MapGet("/", context =>
            {
                context.Response.Redirect("/swagger/index.html");
                return Task.CompletedTask;
            });

            app.MapControllers();

            app.Run();
        }
    }
}
