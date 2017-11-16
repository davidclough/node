using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scaffolder
{
    public class PropertyData
    {
        public string PropertyName { get; set; }
        public string DbFieldType { get; set; }
        public string PropertyType { get; set; }

        public void PopulatePropertyTypeFromDbFieldType()
        {
            if (DbFieldType.Contains("varchar"))
            {
                PropertyType = "string";
            }
            else if (DbFieldType.StartsWith("bit"))
            {
                PropertyType = "bool";
            }
            else if (DbFieldType.StartsWith("int"))
            {
                PropertyType = "int";
            }
            else if (DbFieldType.StartsWith("date"))
            {
                PropertyType = "DateTime";
            }
            else if (DbFieldType.StartsWith("decimal") || DbFieldType.StartsWith("money") || DbFieldType.StartsWith("float"))
            {
                PropertyType = "decimal";
            }
            else
            {
                throw new ApplicationException(String.Format("DbFieldType not recognized: {0)", DbFieldType));
            }
        }
    }
}
