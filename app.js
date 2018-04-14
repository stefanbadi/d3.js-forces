// Data
var data = {
  nodes: [
    { name: 'Jack' },
    { name: 'Bob' },
    { name: 'Bill' },
    { name: 'Jan' },
    { name: 'Edward' },
    { name: 'Sara' },
    { name: 'Nikki' },
    { name: 'Ronald' },
    { name: 'Jerry' },
    { name: 'Zac' }
  ],
  links: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 5 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 8 },
    { source: 5, target: 9 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 }
  ]
};

//Width and height
var chart_width = 600;
var chart_height = 600;
var colors = d3.scaleOrdinal(d3.schemeCategory10);

//Force layouts
var force = d3
  .forceSimulation(data.nodes)
  //push pull effect between data and apply strength to it
  .force('charge', d3.forceManyBody().strength(-250))
  .force('link', d3.forceLink(data.links))
  .force(
    'center',
    d3
      .forceCenter()
      .x(chart_width / 2)
      .y(chart_height / 2)
  );

// SVG
var svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', chart_width)
  .attr('height', chart_height);

// Lines AKA Links
var lines = svg
  .selectAll('line')
  .data(data.links)
  .enter()
  .append('line')
  .style('stroke', '#24292e')
  .style('stroke-width', 2);

// Nodes
var nodes = svg
  .selectAll('circle')
  .data(data.nodes)
  .enter()
  .append('circle')
  .attr('r', 20)
  .style('fill', function(d, i) {
    return colors(i);
  });

// Tooltip
nodes.append('title').text(function(d) {
  return d.name;
});

//apply tick event to force to handle time elapsed
//update the positions
//console.log data in console and see the paths in the object: source.x etc
force.on('tick', function(d) {
  lines
    .attr('x1', function(d) {
      return d.source.x;
    })
    .attr('y1', function(d) {
      return d.source.y;
    })
    .attr('x2', function(d) {
      return d.target.x;
    })
    .attr('y2', function(d) {
      return d.target.y;
    });

  nodes
    .attr('cx', function(d) {
      return d.x;
    })
    .attr('cy', function(d) {
      return d.y;
    });
});
