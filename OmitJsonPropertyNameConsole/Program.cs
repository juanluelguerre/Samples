using Newtonsoft.Json;
using System;

namespace ConsoleJson
{

    public static class Program
    {
        static void Main(string[] args)
        {
            // Use case 1: Starndard deserialization
            string json1 = "{\"first_name\":\"Juan Luis\",\"LastName\":\"Guerrero\"}";
            var p1 = JsonConvert.DeserializeObject<Person>(json1);
            Console.WriteLine("Person 1:");
            Console.WriteLine($"\t{JsonConvert.SerializeObject(p1)}");


            // Use Case 2,3, 4 settings:
            var setting = new JsonSerializerSettings
            {
                ContractResolver = new OmitJsonPropertyNameContractResolver()
            };


            // Use Case 2: JsonProperty Name ignored/omited when serialize
            var p2 = JsonConvert.DeserializeObject<Person>(json1);
            Console.WriteLine("Person 2:");
            Console.WriteLine($"\t{JsonConvert.SerializeObject(p2, setting)}");


            // Use Case 3: JsonProperty Name ignored/omited when Deserialize
            string json3 = "{\"FirstName\":\"Juan Luis\",\"LastName\":\"Guerrero\"}";
            var p3 = JsonConvert.DeserializeObject<Person>(json3, setting);
            Console.WriteLine("Person 3:");
            Console.WriteLine($"\t{JsonConvert.SerializeObject(p3)}");


            // Use Case 4: JsonProperty Name ignored/omited when Serialice & Deserialize
            string json4 = "{\"FirstName\":\"Juan Luis\",\"LastName\":\"Guerrero\"}";
            var p4 = JsonConvert.DeserializeObject<Person>(json4, setting);
            Console.WriteLine("Person 4:");
            Console.WriteLine($"\t{JsonConvert.SerializeObject(p4, setting)}");
        }
    }
}

