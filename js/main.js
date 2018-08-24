var speed = 30000;


$('#speed_dropdown').on('input', function(event) {
    if (event.target.value == 1) {
        g.selectAll("*").remove();
        svg_meetings.selectAll("*").remove();
        svg_brush.selectAll("*").remove();
        svg_button.selectAll("*").remove();
        speed = 30000;
    }

    if (event.target.value == 2) {
        g.selectAll("*").remove();
        svg_meetings.selectAll("*").remove();
        svg_brush.selectAll("*").remove();
        svg_button.selectAll("*").remove();
        speed = 100000;
    }
    everything(marker_classes_2, marker_classes_centers_2, filenames_2, colors_2, distances[0], speed, numbers);
});
var marker_classes_2 = []
var marker_classes_centers_2 = ["median"]


var filenames_centers_2 = []
var colors_2 = [];
var numbers = [];




function change_category() {
    g.selectAll("*").remove();
    svg_meetings.selectAll("*").remove();
    svg_brush.selectAll("*").remove();
    marker_classes_2 = []
    colors_2 = [];
    numbers = [];
}

function myFunction(isChecked, filename, distance, marker_class, center, col, number) {
    g.selectAll("*").remove();
    svg_button.selectAll("*").remove();
    svg_meetings.selectAll("*").remove();
    svg_brush.selectAll("*").remove();
    if (isChecked) {
        marker_classes_2.push(marker_class);
        colors_2.push(col);
        distances.push(distance);
        numbers.push(number)
    } else {
        remove_element_from_array(marker_classes_2, marker_class);
        remove_element_from_array(numbers, number);
        remove_element_from_array(colors_2, col)
        remove_element_from_array(distances, distance)
    }
    everything(marker_classes_2, marker_classes_centers_2, filenames_2, colors_2, distances[0], speed, numbers);
}

var svg_button = d3.select("#button").append("svg");

var svg_brush = d3.select("body").append("svg");

var svg_meetings = d3.select("body").append("svg");

var map;

map = L.map('map').setView([55.67, 12.56], 10);

var bgMap = "https://api.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaWdvcnRpIiwiYSI6IkROMTNFa00ifQ.pvVGeuMJHy973-6SK8LJkA";
L.tileLayer(bgMap, {
    maxZoom: 18
}).addTo(map);
map.scrollWheelZoom.disable();

var svg = d3.select(map.getPanes().overlayPane).append("svg");
var g = svg.append("g").attr("class", "leaflet-zoom-hide");

var topLeft = [0, 0];
var bottomRight = [0, 0];


var timeFormat = d3.time.format("%I:%M %p %a");
var parseDate = d3.timeParse("%s");



everything(marker_classes_2, marker_classes_centers_2, filenames_2, colors_2, distances[0], speed, numbers);


function everything(marker_classes, marker_classes_centers, filenames, colors, distance, speed2, numbers) {

    var bool = false;

    svg_button.attr("width", 1000)
        .attr("height", 200)
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("height", "100%")
        .attr("width", "100%")
        .attr("fill", "none");



    text_i = ["Groups Movement Animated"]
    text_ii = ["Groups Location Interactively"]
    text_v = ["Groups Meetings"]




    var text_i = svg_button.selectAll("text_i")
        .data(text_i)
        .enter()
        .append("text")

    text_i.attr("x", function(d) {
            return 50;
        })
        .attr("y", function(d) {
            return 30;
        })
        .text(function(d) {
            return d;
        })
        .attr("font-size", "16px")
        .attr("fill", "black")
        .on("mouseover", function(d) {
            d3.select(this).style("cursor", "pointer")
            text_i.attr("fill", "lightGreen")
        })
        .on("mouseout", function(d) {
            text_i.attr("fill", "black")
        })
        .on("click", function(d) {
            var checkedBoxes = $('.group-box-list.visible label input:checked');

            if (checkedBoxes.length < 1) {
                alert('Please select at least one group.');
                return;
            }
            var bool = false;
            g.selectAll("*").remove();
            svg_brush.selectAll("*").remove();
            d3.select(this).call(vis(filenames, marker_classes, numbers));
        });


    var text_ii = svg_button.selectAll("text_ii")
        .data(text_ii)
        .enter()
        .append("text");

    text_ii.attr("x", function(d) {
            return 50;
        })
        .attr("y", function(d) {
            return 55;
        })
        .text(function(d) {
            return d;
        })
        .attr("font-size", "16px")
        .attr("fill", "black")
        .on("mouseover", function(d) {
            d3.select(this).style("cursor", "pointer")
            text_ii.attr("fill", "lightGreen")
        })
        .on("mouseout", function(d) {
            text_ii.attr("fill", "black")
        })
        .on("click", function(d) {
            var checkedBoxes = $('.group-box-list.visible label input:checked');

            if (checkedBoxes.length < 1) {
                alert('Please select at least one group.');
                return;
            }
            g.selectAll("*").remove();
            svg_brush.selectAll("*").remove();
            d3.select(this).call(vis2(filenames, colors, numbers));
        });

    var text_v = svg_button.selectAll("text_v")
        .data(text_v)
        .enter()
        .append("text");

    text_v.attr("x", function(d) {
            return 50;
        })
        .attr("y", function(d) {
            return 80;
        })
        .text(function(d) {
            return d;
        })
        .attr("font-size", "16px")
        .attr("fill", "black")
        .on("mouseover", function(d) {
            d3.select(this).style("cursor", "pointer")
            text_v.attr("fill", "lightGreen")
        })
        .on("mouseout", function(d) {
            text_v.attr("fill", "black")
        })
        .on("click", function(d) {
            var checkedBoxes = $('.group-box-list.visible label input:checked');

            if (checkedBoxes.length < 1) {
                alert('Please select at least one group.');
                return;
            }

            g.selectAll("*").remove();
            svg_brush.selectAll("*").remove();
            d3.select(this).call(vis3(colors, numbers));
        });




    function vis(filenames, marker_classes, number) {
        return function() {
            d3.selectAll(".button").remove();

            function addPointsOnTheMap(collection, marker_class, left_border, right_border, number) {

                var transform = d3.geo.transform({
                    point: projectPoint
                });



                var d3path = d3.geo.path().projection(transform);
                var toLine = d3.svg.line()
                    .interpolate("linear")
                    .x(function(d) {
                        return applyLatLngToLayer(d).x
                    })
                    .y(function(d) {
                        return applyLatLngToLayer(d).y
                    });

                var marker;
                var markers_array = [];
                var featuresdata_array = [];
                var line_array = [];

                // load distinct node values from geojson file
                var distinctFields = new Set();

                $(collection.features).map(function(index, value) {
                    if (value.properties.group == number) { // pairnei ap ola ta groups pou anikei
                        distinctFields.add(value.properties.node);
                    }
                });


                $.each([...distinctFields], function(index, value) {
                    var featuresdata = collection.features.filter(function(d) {
                        return d.properties.node == value && d.properties.timestamp >= left_border && d.properties.timestamp <= right_border && d.properties.group == number
                    });

                    featuresdata_array.push(featuresdata);


                    var lineId = "line" + value;
                    var lineHTMLId = "#" + lineId;

                    var line = g.selectAll(lineHTMLId)
                        .data([featuresdata])
                        .enter()
                        .append("path")
                        .attr("class", "line");

                    line_array.push(line);

                    var markerId = "marker" + value;
                    var markerHTMLId = "#" + markerId;

                    var marker = g.append("circle")
                        .attr("r", 4)
                        .attr("id", markerId)
                        .attr("class", marker_class);

                    markers_array.push(marker);

                    map.on("viewreset", reset);

                    transition(line, markerHTMLId, featuresdata);

                });



                reset();

                function reset() {
                    var i;
                    for (i = 0; i < markers_array.length; i++) {
                        markers_array[i].attr("transform",
                            function() {
                                var y = featuresdata_array[i][0].geometry.coordinates[1]
                                var x = featuresdata_array[i][0].geometry.coordinates[0]
                                return "translate(" +
                                    map.latLngToLayerPoint(new L.LatLng(y, x)).x + "," +
                                    map.latLngToLayerPoint(new L.LatLng(y, x)).y + ")";
                            }
                        );
                        line_array[i].attr("d", toLine);
                    }


                    var bounds = d3path.bounds(collection)

                    if (Math.abs(topLeft[0]) > Math.abs(bounds[0][0])) {
                        topLeft[0] = bounds[0][0];
                    }
                    if (Math.abs(topLeft[1]) > Math.abs(bounds[0][1])) {
                        topLeft[1] = bounds[0][1];
                    }
                    if (Math.abs(bottomRight[0]) < Math.abs(bounds[1][0])) {
                        bottomRight[0] = bounds[1][0];
                    }
                    if (Math.abs(bottomRight[1]) < Math.abs(bounds[1][1])) {
                        bottomRight[1] = bounds[1][1];
                    }

                    svg.attr("width", bottomRight[0] - topLeft[0] + 250)
                        .attr("height", bottomRight[1] - topLeft[1] + 250)
                        .style("left", topLeft[0] - 50 + "px")
                        .style("top", topLeft[1] - 50 + "px");

                    g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");

                }


                function transition(line, marker_selector, featuresdata) {
                    line.transition()
                        .duration(speed)
                        .attrTween(
                            "stroke-dasharray",
                            tweenDash(line, marker_selector, featuresdata, 0)
                        )
                };

                function tweenDash(_line, _marker_selector, featuresdata, i) {
                    return function() {
                        return function(t) {
                            var l = _line.node().getTotalLength();
                            interpolate = d3.interpolateString("0," + l, l + "," + l);

                            var marker = d3.select(_marker_selector);
                            var p = _line.node().getPointAtLength(t * l);
                            marker.attr("transform", "translate(" + p.x + "," + p.y + ")"); //move marker



                            i = i + 1;


                            return interpolate(t);
                        }
                    }
                }
            };

            svg_brush_initialisation();

            var xScale = d3.scaleTime().range([0, width]);


            var xAxis = d3.axisBottom(xScale);


            var brush = d3.brushX()
                .extent([
                    [0, 0],
                    [width, height]
                ])
                .on("end", brushed);

            var b = svg_brush.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv(distance, function(error, datad) {
                if (error) throw error;
                var data = datad.filter(function(d) {

                    return d.group == number[0];
                })

                xScale.domain(d3.extent(data, function(d) {
                    return parseDate(parseInt(d.timestamp));
                }));


                var yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, function(d) {
                        return +d.distance;
                    })])
                    .range([height, 0]);

                b.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + (height) + ")")
                    .call(d3.axisBottom(xScale));

                b.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left + 2)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .attr("class", "axtext")
                    .style("text-anchor", "middle")
                    .text("Km");


                b.append("g")
                    .attr("class", "axis axis--y")
                    .attr("class", "axtext")
                    .call(d3.axisLeft(yScale))
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)


                b.append("text")
                    .attr("transform",
                        "translate(" + (width / 2) + " ," +
                        (height + margin.top + 8) + ")")
                    .style("text-anchor", "middle")
                    .text("Median distance from Geometric Median");


                if (numbers.length == 1) {
                    b.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d, i) {
                            return i * 1.4;
                        })
                        .attr("y", function(d) {
                            return yScale(d.distance);
                        })
                        .attr("width", 2)
                        .attr("height", function(d) {
                            return (height - yScale(d.distance));
                        });

                } else {
                    d3.selectAll(".axtext").remove();
                    d3.selectAll(".axy").remove();
                    b.selectAll(".bar")
                        .data(data)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d, i) {
                            return i * 1.4;
                        })
                        .attr("y", function(d) {
                            return 1;
                        })
                        .attr("width", 2)
                        .attr("fill", "beige")
                        .attr("height", function(d) {
                            return height - 1;
                        });

                }


                b.append("g")
                    .attr("class", "brush")
                    .call(brush)
                    .call(brush.move, [0, width]);




            });


            function brushed() {

                d3.selectAll(".invisibleline").remove();
                d3.selectAll(".redline").remove()
                g.selectAll("*").remove()
                var queue = d3.queue();
                filenames.forEach(function(filename) {
                    queue.defer(d3.json, filename);
                });
                queue.awaitAll(function(error, csvDataSets) {

                    if (error) throw error;
                    for (var i = numbers.length - 1; i >= 0; i--) {
                        addPointsOnTheMap(csvDataSets[0], marker_classes[i], l, r, numbers[i])
                    }
                });

                var s = d3.event.selection || xScale.range();

                l = new Date(s.map(xScale.invert, xScale)[0]).getTime() / 1000
                r = new Date(s.map(xScale.invert, xScale)[1]).getTime() / 1000

                add_red_line(l, r);
            }


            function add_red_line(l, r) {
                d3.csv("data/distances.csv", function(error, data) {


                    var featuresdata_2 = data.filter(function(d) {

                        return d.timestamp >= l && d.timestamp <= r
                    });


                    var vertical_line = d3.svg.line()
                        .interpolate("linear")
                        .x(function(d) {
                            return xScale(d.timestamp * 1000)
                        })
                        .y(function(d) {
                            return 0;
                        })

                    var path1 = b.append("path")
                        .attr("d", vertical_line(featuresdata_2))
                        .attr("fill", "none")
                        .attr("class", "invisibleline");




                    var bla = b.append("line")
                        .attr("x1", xScale(l))
                        .attr("y1", 0)
                        .attr("x2", xScale(l))
                        .attr("y2", height)
                        .style("stroke-width", 2)
                        .style("stroke", colors[0])
                        .style("fill", "none")
                        .attr("class", "redline");


                    transition_line();

                    function transition_line() {
                        bla.transition()
                            .duration(speed)
                            .attrTween("transform", translateAlong(path1.node()))
                    }

                    function translateAlong(path) {
                        var l = path.getTotalLength();
                        return function(d, i, a) {
                            return function(t) {
                                var p = path.getPointAtLength(t * l);
                                return "translate(" + p.x + "," + p.y + ")";
                            };
                        };
                    }
                })

            }
        };
    }; //end vis

    function vis2(filenames, colors, numbers) {

        return function() {


            var number = numbers[0];

            function addStaticPoints(collection, current_timestamp, color, number) {


                var featuresdata = collection.features.filter(function(d) {

                    return d.properties.timestamp == parseFloat(current_timestamp) && d.properties.group == number;
                })

                var transform = d3.geo.transform({
                    point: projectPoint
                });

                var d3path = d3.geo.path().projection(transform);


                var ptFeatures = g.selectAll("c")
                    .data(featuresdata)
                    .enter()
                    .append("circle")


                map.on("viewreset", reset);


                reset();

                function reset() {
                    var bounds = d3path.bounds(collection),
                        topLeft = bounds[0],
                        bottomRight = bounds[1];


                    ptFeatures.attr("transform",
                        function(d) {
                            return "translate(" +
                                applyLatLngToLayer(d).x + "," +
                                applyLatLngToLayer(d).y + ")";
                        });

                    if (color == "black") {
                        ptFeatures.attr("r", 20)
                            .attr("stroke", "black")
                            .attr("stroke-width", 4)
                            .attr("fill", "none")
                            .attr("class", "center")

                    } else {

                        ptFeatures.attr("r", 5)
                        ptFeatures.attr("fill", color)
                            .on("mouseover", add_text_to_dots)
                            .on("mouseout", remove_text_from_dots)
                            .attr("class", "bla");
                    }


                    svg.attr("width", bottomRight[0] - topLeft[0] + 500)
                        .attr("height", bottomRight[1] - topLeft[1] + 500)
                        .style("left", topLeft[0] - 50 + "px")
                        .style("top", topLeft[1] - 50 + "px");

                    g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");

                }


            };

            // //Barplot

            svg_brush_initialisation();

            svg_brush.selectAll("text_time")
                .data(text_i)
                .enter()
                .append("text")

            var xScale = d3.scaleTime().range([0, width]);

            var xAxis = d3.axisBottom(xScale);

            var b = svg_brush.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            d3.csv(distance, function(datad) {

                var dataset = datad.filter(function(d) {

                    return d.group == number;
                })




                xScale.domain(d3.extent(dataset, function(d) {
                    return parseDate(parseInt(d.timestamp));
                }));

                var yScale = d3.scaleLinear()
                    .domain([0, d3.max(dataset, function(d) {
                        return +d.distance;
                    })])
                    .range([height, 0]);



                b.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(xScale));

                b.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 0 - margin.left + 2)
                    .attr("x", 0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .attr("class", "axtext")
                    .text("Km");


                b.append("g")
                    .attr("class", "axis axis--y")
                    .attr("class", "axtext")
                    .call(d3.axisLeft(yScale))
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)

                b.append("text")
                    .attr("transform",
                        "translate(" + (width / 2) + " ," +
                        (height + margin.top + 8) + ")")
                    .style("text-anchor", "middle")
                    .text("Median distance from Geometric Median");

                if (numbers.length == 1) {
                    b.selectAll(".bar")
                        .data(dataset)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d, i) {
                            return i * 1.4;
                        })
                        .attr("y", function(d) {
                            return yScale(d.distance);
                        })
                        .attr("width", 2)
                        .attr("height", function(d) {
                            return (height - yScale(d.distance));
                        })
                        .on("click", function() {
                            d3.select("#time").remove();
                            g.selectAll("*").remove();
                            d3.selectAll(".bar").attr("fill", "black")
                            d3.select(this).style("cursor", "pointer");
                            d3.select(this)
                                .attr("fill", "#add65c")
                                .call(
                                    function(d) {
                                        change_points(d.data()[0].timestamp, filenames, colors)
                                    }
                                )
                                .call(function(d) {
                                    append_text(d.data()[0].timestamp)
                                });
                        })
                } else {
                    d3.selectAll(".axtext").remove();
                    b.selectAll(".bar")
                        .data(dataset)
                        .enter().append("rect")
                        .attr("class", "bar")
                        .attr("x", function(d, i) {
                            return i * 1.4;
                        })
                        .attr("y", function(d) {
                            return 1;
                        })
                        .attr("width", 2)
                        .attr("fill", "beige")
                        .attr("height", function(d) {
                            return (height - 1);
                        })
                        .on("click", function() {
                            d3.select("#time").remove();
                            g.selectAll("*").remove();
                            d3.selectAll(".bar")
                                .attr("fill", "beige")
                            d3.select(this).style("cursor", "pointer");
                            d3.select(this)
                                .attr("fill", colors[0])
                                .call(
                                    function(d) {
                                        change_points(d.data()[0].timestamp, filenames, colors)
                                    }
                                )
                                .call(function(d) {
                                    append_text(d.data()[0].timestamp)
                                });
                        })

                }

                function second_barplot() {

                    svg_meetings_initialisation();

                    svg_meetings.selectAll("text_time")
                        .data(text_i)
                        .enter()
                        .append("text")

                    var xScale = d3.scaleTime().range([0, width]);

                    var xAxis = d3.axisBottom(xScale);

                    var b = svg_meetings.append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                    d3.csv("data/meetings2.csv", function(datad) {

                        var dataset = datad.filter(function(d) {
                            return d.group == number;
                        })

                        xScale.domain(d3.extent(dataset, function(d) {
                            return parseDate(parseInt(d.timestamp));
                        }));

                        var yScale = d3.scaleLinear()
                            .domain([0, d3.max(dataset, function(d) {
                                return +d.active;
                            })])
                            .range([height, 0]);



                        b.append("g")
                            .attr("class", "axis axis--x")
                            .attr("transform", "translate(0," + height + ")")
                            .call(d3.axisBottom(xScale));

                        b.append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", 0 - margin.left + 2)
                            .attr("x", 0 - (height / 2))
                            .attr("dy", "1em")
                            .style("text-anchor", "middle")
                            .text("Number of Active Members");


                        b.append("g")
                            .attr("class", "axis axis--y")
                            .call(d3.axisLeft(yScale))
                            .append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("y", 6)

                        b.append("text")
                            .attr("transform",
                                "translate(" + (width / 2) + " ," +
                                (height + margin.top + 8) + ")")
                            .style("text-anchor", "middle")
                            .text("Active Members in the Group");

                        if (numbers.length == 1) {
                            b.selectAll(".bar")
                                .data(dataset)
                                .enter().append("rect")
                                .attr("class", "bar")
                                .attr("x", function(d, i) {
                                    return i * 1.4;
                                })
                                .attr("y", function(d) {
                                    return yScale(d.active);
                                })
                                .attr("width", 2)
                                .attr("height", function(d) {
                                    return (height - yScale(d.active));
                                })
                                .on("click", function() {
                                    d3.select("#time").remove();
                                    g.selectAll("*").remove();
                                    d3.selectAll(".bar").attr("fill", "black")
                                    d3.select(this).style("cursor", "pointer");
                                    d3.select(this)
                                        .attr("fill", "#add65c")
                                        .call(
                                            function(d) {
                                                change_points(d.data()[0].timestamp, filenames, colors)
                                                change_points(d.data()[0].timestamp, ["data/meetings2.geojson"], ['black'])
                                            }
                                        )
                                        .call(function(d) {
                                            append_text(d.data()[0].timestamp)
                                        });
                                })
                        } else {
                            svg_meetings.remove();


                        }
                    })

                }


                function change_points(current_timestamp, filenames, colors) {
                    g.selectAll("*").remove();
                    var queue = d3.queue();
                    filenames.forEach(function(filename) {
                        queue.defer(d3.json, filename);
                    });
                    queue.awaitAll(function(error, csvDataSets) {
                        if (error) throw error;
                        for (var i = numbers.length - 1; i >= 0; i--) {
                            addStaticPoints(csvDataSets[0], current_timestamp + ".0", colors[i], numbers[i])

                        }
                    });

                    if (bool == true) {
                        centers(current_timestamp, ["data/meetings2.geojson"], colors);
                    }

                };


                function centers(current_timestamp, filenames_centers, colors) {
                    var queue = d3.queue();
                    filenames_centers.forEach(function(filename) {
                        queue.defer(d3.json, filename);
                    });
                    queue.awaitAll(function(error, csvDataSets) {
                        if (error) throw error;
                        for (var i = csvDataSets.length - 1; i >= 0; i--) {
                            addStaticPoints(csvDataSets[i], current_timestamp + ".0", "black")

                        }
                    });

                };

                function add_centers_button() {
                    d3.selectAll(".button").remove();
                    text_iii = ["Add groups meetings"]

                    var text_iii = svg_button.selectAll("text_iii")
                        .data(text_iii)
                        .enter()
                        .append("text");

                    text_iii.attr("x", function(d) {
                            return 800;
                        })
                        .attr("y", function(d) {
                            return 40;
                        })
                        .text(function(d) {
                            return d;
                        })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "16px")
                        .attr("fill", "black")
                        .on("mouseover", function(d) {
                            d3.select(this).style("cursor", "pointer")
                            text_iii.attr("fill", "lightGreen")
                        })
                        .on("mouseout", function(d) {
                            text_iii.attr("fill", "black")
                        })
                        .on("click", function(d) {
                            g.selectAll("*").remove();
                            second_barplot();
                            remove_centers_button();
                            bool = true;
                        })
                        .attr("class", "button")

                }

                function remove_centers_button() {

                    d3.selectAll(".button").remove();
                    text_iii = ["Remove groups meetings"]

                    var text_iii = svg_button.selectAll("text_iii")
                        .data(text_iii)
                        .enter()
                        .append("text");

                    text_iii.attr("x", function(d) {
                            return 800;
                        })
                        .attr("y", function(d) {
                            return 40;
                        })
                        .text(function(d) {
                            return d;
                        })
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "16px")
                        .attr("fill", "black")
                        .on("mouseover", function(d) {
                            d3.select(this).style("cursor", "pointer")
                            text_iii
                                .attr("fill", "lightGreen")
                        })
                        .on("mouseout", function(d) {
                            text_iii
                                .attr("fill", "black")
                        })
                        .attr("class", "button")
                        .on("click", function(d) {
                            g.selectAll("*").remove();
                            svg_meetings.selectAll("*").remove();
                            add_centers_button();
                            bool = false;
                        });

                }
                if (numbers.length==1){
                add_centers_button();
                }

            })



        }

    }; //end vis2

    function vis3(colors, numbers) {
        return function() {
            for (var i = numbers.length - 1; i >= 0; i--) {
                add_meetings(colors[i], numbers[i])

            }

            function add_meetings(color, number) {
                d3.json("data/locations.geojson", function(collection) {


                    var distinctFields = new Set();
                    var d3path;
                    var ptFeatures;


                    featuresdata = collection.features.filter(function(d) {
                        return d.properties.community == number;
                    });


                    var transform = d3.geo.transform({
                        point: projectPoint
                    });

                    d3path = d3.geo.path().projection(transform);



                    ptFeatures = g.selectAll("c")
                        .data(featuresdata)
                        .enter()
                        .append("circle")


                    map.on("viewreset", reset);



                    reset();

                    function reset() {
                        var bounds = d3path.bounds(collection),
                            topLeft = bounds[0],
                            bottomRight = bounds[1];


                        ptFeatures.attr("transform",
                            function(d) {
                                return "translate(" +
                                    applyLatLngToLayer(d).x + "," +
                                    applyLatLngToLayer(d).y + ")";
                            });

                        ptFeatures.attr("r", 5)
                        ptFeatures.attr("fill", color)
                            .attr("opacity", '0.4')
                            .attr("class", "bla");

                        svg.attr("width", bottomRight[0] - topLeft[0] + 500)
                            .attr("height", bottomRight[1] - topLeft[1] + 500)
                            .style("left", topLeft[0] - 50 + "px")
                            .style("top", topLeft[1] - 50 + "px");

                        g.attr("transform", "translate(" + (-topLeft[0] + 50) + "," + (-topLeft[1] + 50) + ")");

                    }




                })
            }
        }
    }; //end vis3

    function svg_brush_initialisation() {

        svg_brush.attr("width", 1000)
            .attr("height", 200);

        svg_brush.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "beige");

        margin = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 50
            }, // plot 2
            width = +svg_brush.attr("width") - margin.left - margin.right,
            height = +svg_brush.attr("height") - margin.top - margin.bottom;
    }

    function svg_meetings_initialisation() {

        svg_meetings.attr("width", 1000)
            .attr("height", 200);

        svg_meetings.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "beige");

        margin = {
                top: 30,
                right: 20,
                bottom: 50,
                left: 50
            }, // plot 2
            width = +svg_meetings.attr("width") - margin.left - margin.right,
            height = +svg_meetings.attr("height") - margin.top - margin.bottom;
    }



    function projectPoint(x, y) {
        var point = map.latLngToLayerPoint(new L.LatLng(y, x));
        this.stream.point(point.x, point.y);
    }


}


function applyLatLngToLayer(d) {
    var y = d.geometry.coordinates[1]
    var x = d.geometry.coordinates[0]
    return map.latLngToLayerPoint(new L.LatLng(y, x))
}

function remove_element_from_array(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
}

function append_text(current_timestamp) {
    svg_brush.append("text").attr("x", 500).attr("y", 25).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "30px").attr("font-weight", "bold").text(timeFormat(new Date(current_timestamp * 1000))).attr("id", "time")
}

function node_text(current_timestamp) {
    g.append("text").attr("x", 700).attr("y", 25).attr("text-anchor", "middle").attr("font-family", "sans-serif").attr("font-size", "30px").attr("font-weight", "bold").text(current_timestamp).attr("id", "node")
}

function add_text_to_dots(d) {
    d3.select(this).attr("r", 10)
    var text = g.append("text")
        .attr("x", applyLatLngToLayer(d).x - 10)
        .attr("y", applyLatLngToLayer(d).y - 10)
        .html(function() {
            return ["<tspan>Id :</tspan>  " + String(d.properties.node) +
                "<tspan>, Groups: </tspan> " + d.properties.overlap.replace(/\s|\[|\]/g, "")
            ];
        })
        .attr("fill", "#8B0000")
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("opacity", 1)
        .attr("font-weight", "bold")
        .attr("id", "current")
        .attr("call", bbox);
    var bbox = text.node().getBBox();
    var rect = g.append("rect")
        .attr("x", bbox.x - 2.5)
        .attr("y", bbox.y - 2.5)
        .attr("width", bbox.width + 5)
        .attr("height", bbox.height + 5)
        .style("fill", "beige")
        .style("fill-opacity", "0.3")
        .style("stroke", "black")
        .style("stroke-width", "1.5px")
        .attr("class", "rectaroundtext");

}

function remove_text_from_dots() {
    d3.select(this)
        .attr("r", 4);

    d3.selectAll(".rectaroundtext").remove();
    d3.selectAll("#current").remove();
}