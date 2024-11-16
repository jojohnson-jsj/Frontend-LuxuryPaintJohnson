using Azure.Identity;
using LuxuryPaintJohnsonAPI.Data;
using LuxuryPaintJohnsonAPI.Repositories;
using LuxuryPaintJohnsonAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Use DefaultAzureCredential for Azure AD Authentication
var azureCredential = new DefaultAzureCredential();

builder.Services.AddDbContext<AppDbContext>(options =>
{
	var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

	options.UseSqlServer(connectionString, sqlOptions =>
	{
		sqlOptions.EnableRetryOnFailure(); // Retry on transient failures
	});
});

// Dependency Injection
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<IPhotoRepository, PhotoRepository>();

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
