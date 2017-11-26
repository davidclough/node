using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using Newtonsoft.Json;

namespace Scaffolder
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var templateData = GetTemplateDataFromFile("TemplateData.json");
            //var templateData = ConstructTemplateDataFile();

            var templateProcessor = new TemplateProcessor(templateData);
            templateProcessor.CopyTemplateToNewLocationAndReplacePlaceholders();

            // TODO: {{CUSTOM_PROPERTY_COUNT+N}}
            // TODO: When obvious that they are no use, it will be extremely easy to remove the properties:
            //          NumberOfStandardProperties and PropertyCount.

            // TODO: Rename TemplateData.Properties to CustomProperties in class and JSON file.
        }

        private static TemplateData GetTemplateDataFromFile(string filePath)
        {
            string fileContents = File.ReadAllText(filePath);
            var templateData = JsonConvert.DeserializeObject<TemplateData>(fileContents);
            templateData.PopulatePropertyTypesFromDbFieldTypes();
            return templateData;
        }

        private static TemplateData ConstructTemplateDataFile()
        {
            var templateData = new TemplateData
            {
                TemplateName = "TestTemplate",
                EntityNamePascalCase = "WashingMachine",
                SolutionNamespace = "BozzerBox",
                NextAssemblyVersionToBePublished = "1.14.3",
                ApiVersionNumber = 2,
                TargetSolutionPath = @"C:\Solutions\MySpecialSolution",
                NumberOfStandardProperties = 6,
                Properties = new[]
                {
                    new PropertyData
                    {
                        PropertyName = "ModelName",
                        FluentMigratorTypeInstruction = "AsString(255).NotNullable()",
                        MappingTestValue = "\"Super Washer 600\"",
                    },
                    new PropertyData
                    {
                        PropertyName = "HasDryer",
                        FluentMigratorTypeInstruction = "AsBoolean.Nullable()",
                        MappingTestValue = "true",
                    },
                }
            };

            File.WriteAllText("WashingMachine.json", JsonConvert.SerializeObject(templateData, Formatting.Indented));

            return templateData;
        }
    }
}
