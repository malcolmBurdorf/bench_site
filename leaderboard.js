var tabledata = [
    {rank: 1, team: "Team Alpha", score: 95},
    {rank: 2, team: "Team Beta", score: 93},
    // Add more team data here
];
var table = new Tabulator("#leaderboard-table", {
    data: tabledata, //assign data to table
    layout: "fitColumns", //fit columns to width of table (optional)
    columns: [ //Define Table Columns
        {title: "Rank", field: "rank", sorter: "number"},
        {title: "Team", field: "team"},
        {title: "Score", field: "score", sorter: "number"},
    ],
});

