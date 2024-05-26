using Microsoft.EntityFrameworkCore;

namespace Project52DotNet.Models;

public class MovieContext : DbContext
{
    public MovieContext(DbContextOptions<MovieContext> options)
        : base(options)
    {
    }

    public DbSet<MovieContext> Movies { get; set; } = null!;
}