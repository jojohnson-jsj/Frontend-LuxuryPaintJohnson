using Microsoft.AspNetCore.Mvc;
using LuxuryPaintJohnsonAPI.Models;
using LuxuryPaintJohnsonAPI.Services;

namespace LuxuryPaintJohnsonAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PhotosController : ControllerBase
{
	private readonly IPhotoService photoService;

	public PhotosController(IPhotoService photoService)
	{
		this.photoService = photoService;
	}

	[HttpGet]
	public async Task<IActionResult> GetPhotos([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
	{
		if (page <= 0 || pageSize <= 0)
		{
			return BadRequest("Page and pageSize must be greater than zero.");
		}

		var photos = await this.photoService.GetPhotosAsync();

		var paginatedPhotos = photos
			.Skip((page - 1) * pageSize)
			.Take(pageSize)
			.ToList();

		var totalPhotos = photos.Count();

		return Ok(new
		{
			Data = paginatedPhotos,
			TotalCount = totalPhotos,
			Page = page,
			PageSize = pageSize
		});
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetPhoto(int id)
	{
		var photo = await this.photoService.GetPhotoByIdAsync(id);

		if (photo is null)
		{
			return NotFound();
		}

		return Ok(photo);
	}

	[HttpPost]
	public async Task<IActionResult> AddPhoto([FromBody] Photo photo)
	{
		var createdPhoto = await this.photoService.AddPhotoAsync(photo);

		return CreatedAtAction(nameof(GetPhoto), new { id = createdPhoto.Id }, createdPhoto);
	}

	[HttpPut("{id}")]
	public async Task<IActionResult> UpdatePhoto(int id, [FromBody] Photo photo)
	{
		if (id != photo.Id)
		{
			return BadRequest();
		}

		var updatedPhoto = await this.photoService.UpdatePhotoAsync(photo);

		return Ok(updatedPhoto);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> DeletePhoto(int id)
	{
		await this.photoService.DeletePhotoAsync(id);

		return NoContent();
	}
}
