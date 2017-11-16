using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder
{
    public class TemplateData
    {
        public string EntityNamePascalCase { get; set; }
        public IEnumerable<PropertyData> Properties { get; set; }

        private string _entityNameCamelCase;
        public string EntityNameCamelCase
        {
            get
            {
                return _entityNameCamelCase ?? (_entityNameCamelCase = EntityNamePascalCase.ToCamelCase());
            }
        }

        public void PopulatePropertyTypesFromDbFieldTypes()
        {
            foreach (PropertyData property in Properties)
            {
                property.PopulatePropertyTypeFromDbFieldType();
            }
        }
    }
}
