using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project52DotNet.Models;

namespace Project52DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieContext _context;

        public MoviesController(MovieContext context)
        {
            _context = context;
        }

        // GET: api/Movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MovieItem>>> GetMovies()
        {
            return await _context.Movies.ToListAsync();
        }

        // GET: api/Movies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieItem>> GetMovieItem(int id)
        {
            var movieItem = await _context.Movies.FindAsync(id);

            if (movieItem == null)
            {
                return NotFound();
            }

            return movieItem;
        }

        // PUT: api/Movies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMovieItem(int id, MovieItem movieItem)
        {
            if (id != movieItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(movieItem).State = EntityState.Modified;

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
        public async Task<ActionResult<MovieItem>> PostMovieItem(MovieItem movieItem)
        {
            _context.Movies.Add(movieItem);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("PostMovieItem", new { id = movieItem.Id }, movieItem);
            return CreatedAtAction(nameof(PostMovieItem), new { id = movieItem.Id }, movieItem);
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
    }
}
