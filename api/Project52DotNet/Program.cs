using Microsoft.EntityFrameworkCore;
using Project52DotNet.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRepositories(builder.Configuration);

// Add services to the container
builder.Services.AddControllers();
// builder.Services.AddDbContext<MovieContext>(opt =>
//     opt.UseInMemoryDatabase("Project52"));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowLocalhost",
            builder => builder
                .WithOrigins("http://localhost:3000") // Specify the URL of your client application
                .AllowAnyMethod()
                .AllowAnyHeader());
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowLocalhost");

app.UseAuthorization();

app.MapControllers();

app.Run();
