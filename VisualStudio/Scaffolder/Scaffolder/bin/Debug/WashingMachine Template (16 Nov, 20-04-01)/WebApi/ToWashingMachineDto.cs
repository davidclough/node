namespace ThreeSquared.AutoMapper.V1.Mappings.TaxSummaryMappings
{
    public class ToWashingMachineDto : IObjectMappingConfiguration
    {
        public void Configure(AutoMapperConfiguration autoMapper)
        {
            BaseAutoMapper.CreateDomainToDtoMap<WashingMachine, WashingMachineDto>()
                .ForMember(dest => dest.ModelName, member => member.MapFrom(src => src.ModelName))
                .ForMember(dest => dest.HasDryer, member => member.MapFrom(src => src.HasDryer));
        }
    }
}
