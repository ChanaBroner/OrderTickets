using Microsoft.AspNetCore.Mvc;
using System.Data;
using Newtonsoft.Json;


namespace Order.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IConfiguration _configuration;
        public OrderController(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        [HttpGet]
        [Route("GetTicketsByStartTime")]
        public JsonResult GetTicketsByStartTime(string startTime1, string startTime2, string startTime3, string startTime4)
        {
            string jsonFilePath = "C:\\Users\\This_user\\Desktop\\Order\\Order\\Order\\Order.json";
            string jsonContent = System.IO.File.ReadAllText(jsonFilePath);

            List<Time> tickets = JsonConvert.DeserializeObject<List<Time>>(jsonContent);

            List<Time> filteredTickets = tickets
                .Where(t => t.startTime.StartsWith(startTime1) || t.startTime.StartsWith(startTime2) ||
                            t.startTime.StartsWith(startTime3) || t.startTime.StartsWith(startTime4))
                .ToList();

            DataTable table = ConvertToDataTable(filteredTickets);

            return new JsonResult(table);
        }


        public DataTable ConvertToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);

            var props = typeof(T).GetProperties();

            foreach (var prop in props)
            {
                dataTable.Columns.Add(prop.Name);
            }

            foreach (var item in items)
            {
                var values = props.Select(prop => prop.GetValue(item, null)).ToArray();
                dataTable.Rows.Add(values);
            }

            return dataTable;
        }

        [HttpPost]
        [Route("DoOrder")]
        public IActionResult DoOrder(string startTime, int seats)
        {
            string jsonFilePath = "C:\\Users\\This_user\\Desktop\\Order\\Order\\Order\\Order.json";
            string jsonContent = System.IO.File.ReadAllText(jsonFilePath);

            List<Time> times = JsonConvert.DeserializeObject<List<Time>>(jsonContent);

            Time selectedTime = times.FirstOrDefault(t => t.startTime == startTime);

            if (selectedTime != null)
            {
                selectedTime.availablePlaces -= seats;

                string updatedJsonContent = JsonConvert.SerializeObject(times, Formatting.Indented);
                System.IO.File.WriteAllText(jsonFilePath, updatedJsonContent);

                return Ok();
            }
            else
            {
                return NotFound();
            }
        }


    }
}