using GarageBooking.Utils;

namespace GarageBooking.Models;

public class RequestFilter
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string Title { get; set; }
    public string Username { get; set; }
    public EventStatus[] Statuses { get; set; }
}