using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project52DotNet.Models;
using Microsoft.AspNetCore.Cors;

namespace Project52DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowLocalhost")]
    public class MoviesController : ControllerBase
    {
        private readonly MovieContext _context;

        public MoviesController(MovieContext context)
        {
            _context = context;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieItemDto>>> GetMovies()
        {
            return await _context.Movies.Select(x => ItemToDto(x)).ToListAsync();
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieItemDto>> GetMovieItem(int id)
        {
            var movieItem = await _context.Movies.FindAsync(id);

            if (movieItem == null)
            {
                return NotFound();
            }

            return ItemToDto(movieItem);
        }

        // PUT: api/Movies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieItem(int id, MovieItemDto movieItemDto)
        {
            if (id != movieItemDto.Id)
            {
                return BadRequest();
            }

            _context.Entry(movieItemDto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MovieItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Movies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MovieItemDto>> PostMovieItem(MovieItemDto movieItemDto)
        {
            var movieItem = new MovieItem
            {
                Title = movieItemDto.Title,
                Year = movieItemDto.Year,
                Month = movieItemDto.Month
            };
            _context.Movies.Add(movieItem);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("PostMovieItem", new { id = movieItem.Id }, movieItem);
            return CreatedAtAction(nameof(PostMovieItem), new { id = movieItem.Id }, ItemToDto(movieItem));
        }

        // DELETE: api/Movies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMovieItem(int id)
        {
            var movieItem = await _context.Movies.FindAsync(id);
            if (movieItem == null)
            {
                return NotFound();
            }

            _context.Movies.Remove(movieItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MovieItemExists(int id)
        {
            return _context.Movies.Any(e => e.Id == id);
        }

        private static MovieItemDto ItemToDto(MovieItem movieItem) =>
            new MovieItemDto
            {
                Id = movieItem.Id,
                Title = movieItem.Title,
                Year = movieItem.Year,
                Month = movieItem.Month
            };
    }
}
