﻿using AutoMapper;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
namespace Backend.Controllers
{
    public class CityController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uow,IMapper mapper)
        {
            this.uow = uow;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.CityRepository.GetCitiesAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);
            
            return Ok(citiesDto);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedOn = DateTime.UtcNow;
            city.LastUpdatedBy = 1;
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityDto cityDto)
        {
            if (id != cityDto.Id)
                return BadRequest("Update Not Allowed");

            var cityfromdb = await uow.CityRepository.FindCity(id);

            if(cityfromdb == null)
                return BadRequest("Update Not Allowed");

            cityfromdb.LastUpdatedOn = DateTime.UtcNow;
            cityfromdb.LastUpdatedBy = 1;
            mapper.Map(cityDto, cityfromdb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
        {
            var cityfromdb = await uow.CityRepository.FindCity(id);
            cityfromdb.LastUpdatedOn = DateTime.UtcNow;
            cityfromdb.LastUpdatedBy = 1;
            mapper.Map(cityDto, cityfromdb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id, JsonPatchDocument<City>cityToPatch)
        {
            var cityfromdb = await uow.CityRepository.FindCity(id);
            cityfromdb.LastUpdatedOn = DateTime.UtcNow;
            cityfromdb.LastUpdatedBy = 1;
            cityToPatch.ApplyTo(cityfromdb,ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    }
}
