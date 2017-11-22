namespace SuperApi.AutoMapper.V1.Mappings.TaxSummaryMappings
{
    public class ToXyzDto : IObjectMappingConfiguration
    {
        public void Configure(AutoMapperConfiguration autoMapper)
        {
            BaseAutoMapper.CreateDomainToDtoMap<Xyz, XyzDto>()
                .ForMember(dest => dest.XyzId, member => member.MapFrom(src => src.XyzId))
{{FOR_EACH_PROPERTY_ADD_FINAL_SEMI_COLON:
                .ForMember(dest => dest.PropertyName, member => member.MapFrom(src => src.PropertyName))
}}
        }
    }
}
