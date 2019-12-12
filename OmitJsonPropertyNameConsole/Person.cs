using Newtonsoft.Json;

namespace ConsoleJson
{
    public class Person
    {
        [JsonProperty("first_name")]
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
