using Microsoft.EntityFrameworkCore;

namespace Project52DotNet.Models;

public static class DataExtensions
{
    public static async Task InitializeDbAsync(this IServiceProvider serviceProvider)
    {
        //Runs this when application starts in async way
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<MovieContext>();
        await dbContext.Database.MigrateAsync();
    }

    public static IServiceCollection AddRepositories(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        //string? connString = configuration.GetConnectionString("MovieStoreContext");
        string connString = "Server=localhost;Database=sql_project_52;User ID=root;Password=w02$lrTn;";
        services.AddDbContextPool<MovieContext>(options => options.UseMySql(connString, ServerVersion.AutoDetect(connString)));

        return services;

    }
}