FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["GarageBooking.csproj", "./"]
RUN dotnet restore "GarageBooking.csproj"

COPY . .
WORKDIR "/src"
RUN dotnet build "GarageBooking.csproj" -c Release -o /app/build
RUN dotnet publish "GarageBooking.csproj" -c Release -o /app/publish --self-contained false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "GarageBooking.dll"]