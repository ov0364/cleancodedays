var BDDOnBoards = require('../../src/bddonboards.js'),
  Casper = require('casper'),
  fs = require('fs'),
  sStoryboard = fs.read('..' + fs.separator + 'test' + fs.separator + 'bddOnBoards' + fs.separator + 'storyboard.json'),
  storyboard = JSON.parse(sStoryboard);
  
BDDOnBoards.create(storyboard, Casper);
