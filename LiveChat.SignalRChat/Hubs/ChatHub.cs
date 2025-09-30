using Microsoft.AspNetCore.SignalR;

namespace LiveChat.SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string usuario, string mensaje)
        {
            
            await Clients.All.SendAsync("ReceiveMessage", usuario, mensaje);
            
        }

    }
}
