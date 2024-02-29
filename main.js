function make_navbar(active_item) {
    // load navbar.html
    $.get("navbar.html", function (data) {
        $("#navbar").replaceWith(data);

        $(".top-navbar .nav-link#" + active_item).toggleClass("active");
        $(".sub-navbar .navbar-nav#" + active_item).toggleClass("subnav-active");
        $(".top-navbar .nav-link").hover(function () {
            var id = $(this).text();
            $(".sub-navbar .navbar-nav").removeClass("subnav-active");
            $(".sub-navbar .navbar-nav#" + id).addClass("subnav-active");
        });

        $(".navbar").mouseleave(function () {
            $(".sub-navbar .navbar-nav").removeClass("subnav-active");
            $(".sub-navbar .navbar-nav#" + active_item).addClass("subnav-active");
        });
    });
}

function insert_footer(active_element) {
    $.get("footer.html", function (data) {
        $("#footer").replaceWith(data);
    });
}


function makeWaypoints(anchors) {
    for (var i = 0; i < anchors.length; ++i) {
        $("h2#" + anchors[i]).waypoint(function (current, previous) {
            return function (direction) {
                if (direction == "down") {
                    $(".sub-navbar .nav-link").removeClass("active");
                    $(".sub-navbar .nav-link[href*=\"" + current + "\"]").addClass("active");
                }
                else if (previous != undefined) {
                    $(".sub-navbar .nav-link").removeClass("active");
                    $(".sub-navbar .nav-link[href*=\"" + previous + "\"]").addClass("active");
                }
            }
        }(anchors[i], (i > 0) ? anchors[i - 1] : undefined), { offset: "0px" });
    }

    if (anchors.length > 0) { $(".sub-navbar .nav-link[href*=\"" + anchors[0] + "\"]").addClass("active"); console.log("setting active."); }
}

function renderLabelDistribution() {


    var histogram = {
        "truck": 7663763,
        "bicycle": 3437542,
        "person_moving": 2330367,
        "trunk": 34474949,
        "terrain": 438221594,
        "other-vehicle_moving": 3380815,
        "fence": 300684960,
        "other-vehicle": 10313066,
        "other-structure": 13755884,
        "road": 1123514865,
        "truck_moving": 2591754,
        "bicyclist_moving": 1192936,
        "other-ground": 17971019,
        "other-object": 53630823,
        "car_moving": 27985041,
        "sidewalk": 654206238,
        "car": 291623494,
        "motorcycle": 2640454,
        "pole": 15400674,
        "motorcyclist": 120698,
        "parking": 84813007,
        "traffic sign": 4649263,
        "outlier": 1775532,
        "vegetation": 1305848698,
        "motorcyclist_moving": 148591,
        "person": 1188450,
        "building": 775185895,
        "bicyclist": 271040
    };

    var order = ['road',
        'sidewalk',
        'parking',
        'other-ground',
        'building',
        'other-structure',
        'car',
        'truck',
        'bicycle',
        'motorcycle',
        'other-vehicle',
        'vegetation',
        'trunk',
        'terrain',
        'person',
        'bicyclist',
        'motorcyclist',
        'fence',
        'pole',
        'traffic sign',
        'other-object',
        'outlier']

    var data = []

    for (var i = 0; i < order.length; ++i) {
        var count = histogram[order[i]];
        var moving_name = order[i] + "_moving";
        // aggregate counts of moving and non-moving objects
        if (histogram.hasOwnProperty(moving_name)) {
            console.log(moving_name);
            count += histogram[moving_name];
        }

        data.push(count);
    }

    console.log(data);

    var width = 500, height = width / 1.61;
    var chart = d3.select("#label_distribution").attr("width", width).attr("height", height);

    // var x = d3.scaleLinear()
    //     .domain([0, d3.max(data)])
    //     .range([0, width]);

    var x = d3.scaleBand().domain(order).range([0, width]).paddingInner(0.1);
    for(var o of order) console.log(o + ":" + x(o));
