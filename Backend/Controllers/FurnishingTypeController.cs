using AutoMapper;
using Backend.Data;
using Backend.Dtos;
using Backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FurnishingTypeController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public FurnishingTypeController(IUnitOfWork uow,IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        //GET api/FurnishingType/list
        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetFurnishingTypes()
        {
            var furnishingTypes = await uow.FurnishingTypeRepository.GetFurnishingTypesAsync();
            var furnishingTypesDTO = mapper.Map<IEnumerable<KeyValuePairDto>>(furnishingTypes);
            return Ok(furnishingTypesDTO);
        }
    }
}
