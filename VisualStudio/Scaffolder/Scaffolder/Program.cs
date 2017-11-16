﻿using System;
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
            var templateProcessor = new TemplateProcessor(templateData);
            templateProcessor.CopyTemplateToNewLocation();

            // TODO: Add Guid functionality for migration scripts.
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
                EntityNamePascalCase = "WashingMachine",
                Properties = new[]
                {
                    new PropertyData { PropertyName = "ModelName", DbFieldType = "nvarchar(255)", PropertyType = "string" },
                    new PropertyData { PropertyName = "HasDryer", DbFieldType = "bit", PropertyType = "bool" },
                }
            };

            File.WriteAllText("WashingMachine.json", JsonConvert.SerializeObject(templateData, Formatting.Indented));

            return templateData;
        }
    }
}