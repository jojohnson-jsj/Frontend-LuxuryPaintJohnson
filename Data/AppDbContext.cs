using LuxuryPaintJohnsonAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LuxuryPaintJohnsonAPI.Data;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {  }

	public DbSet<Photo> Photos { get; set; } = null!;
}
