using Microsoft.AspNetCore.Mvc;
using Phi_2.Model;
using System.Text;

namespace Phi_2.Controllers
{
    [ApiController]
    [Route("LocalAI")]
    public class LocalAIController : ControllerBase
    {
        private readonly ILogger<LocalAIController> _logger;

        public LocalAIController(ILogger<LocalAIController> logger)
        {
            _logger = logger;
        }

        [HttpPost("phi-2")]
        public async Task<ActionResult<string>> Post(ApiRequest request)
        {
            string apiUrl = "http://localhost:8080/v1/completions";

            var postData = request;

            // Serialize the data to JSON
            string jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(postData);

            // Set up HttpClient
            using (HttpClient client = new HttpClient())
            {
                client.Timeout = TimeSpan.FromSeconds(1000);
                // Set the content type to JSON
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                // Create the StringContent with JSON data
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                try
                {
                    // Send the POST request
                    HttpResponseMessage response = await client.PostAsync(apiUrl, content);

                    // Check if the request was successful
                    if (response.IsSuccessStatusCode)
                    {
                        // Read the response content as a string
                        string responseContent = await response.Content.ReadAsStringAsync();
                        _logger.LogInformation(responseContent);
                        return Ok(responseContent);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                catch (Exception ex)
                {
                    return NotFound(ex.Message);
                }
            }
        }
    }
}
