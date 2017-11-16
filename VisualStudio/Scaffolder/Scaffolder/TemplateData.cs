using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder
{
    public class TemplateData
    {
        public string EntityNamePascalCase { get; set; }

        /// <summary>
        /// NOTE: These properties should not include the default properties which are always included and which should be catered for in a
        ///       non-automated way, with specific lines in each template catering for them.
        ///       Currently there are 5 default properties which should not be in this list:
        ///         XyzId   (the primary key)
        ///         CreatedDateTime, CreatedByUserId, ModifiedDateTime, ModifiedByUserId
        /// </summary>
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
