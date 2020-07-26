const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder
const gameplay = require('./prismarine-gameplay').gameplay
const mineflayerViewer = require('prismarine-viewer').mineflayer
const Block = require("prismarine-block")("1.12.2");
const Vec3 = require("vec3");
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
const Recipe = require("prismarine-recipe")("1.12.2").Recipe;


exports.bindLumber = function (bot) {
	_goal = 0;
	logCollected = 0;
	pickAquired = false;

	tryingToCraft = false;
	deathCount = 0;

	bot.on('playerCollect', function(collector, collected) {
		if (collector == bot.entity && collected.metadata[6].blockId == 17) {
			logCollected += collected.metadata[6].itemCount;
			console.log('collected ' + collected.metadata[6].itemCount + ' wood, in total: ' + logCollected);
		}

		if (logCollected >= 4 && !tryingToCraft) {
			tryingToCraft = true;
			// try to find table
			table = bot.findBlock({ point: bot.entity.position, matching: 58, maxDistance: 320 });
			// if (!table) {
				// not found, make one
				table = makeCraftTable(bot, 58).then((table)=>{
					craftWoodPick(table);					
				});
			// } else {
			// 	// found, we need to walk to it
			// 	bot.gameplay.stopAll()
			// 	Walk(bot, table).then(()=>{
			// 		craftWoodPick(table);
			// 	})
			// }
			// if (table != null) {
			// 	sleep(3400);
			// 	pickAquired = true;
			// 	console.log('PICKAXE AQUIRED!')

			// 	// now mining stone...

			// 	bot.gameplay.collectBlock({
			// 			blockType: 'stone',
			// 			distance: 320
			// 		}, (err) => {
			// 			console.log(err) 
			// 		});
			// }
		}
	})

	bot.on('goal_reached', (goal)=> {
		if (_goal == goal) {
			walkingDone = true
		}
	})

	bot.on('death', function() {
		console.log('fuck. i died.')
		pickAquired = false;
		logCollected = 0;
		bot.gameplay.stopAll();
	    sleep(10000);
	    deathCount += 1
	})

	function craftWoodPick(tableBlock) {
		recipe = bot.recipesFor(280);
		setTimeout(()=>{
			bot.craft(recipe[0], 1, tableBlock);
			setTimeout(()=> {
				recipe = bot.recipesFor(270);
				setTimeout(()=> {
					bot.craft(recipe[0], 1, tableBlock, ()=>{
						pickAquired = true;
					});
				
				}, 1000)
			}, 1000)
		}, 1000);
	}

	function makeCraftTable() {
		return new Promise((resolve)=>{
			sleep(1000);
			result = null;
			console.log('getting recipe for planks');
			recipe = bot.recipesFor(5);
			bot.gameplay.stopAll();
			setTimeout(()=>{
				bot.craft(recipe[0], 3, null, setTimeout(function(err) {
					console.log('crafted planks');
					console.log('getting recipe for bench')
					recipe = bot.recipesFor(58);
					bot.craft(recipe[0], 1, null, ()=> {
						console.log('crafted bench')
						done = false;

						grass = bot.findBlock({ point: bot.entity.position, matching: 2 });
						// bot.pathfinder.setGoal(new GoalNear(grass.position.x + 1, grass.position.y, grass.position.z + 1, 2.5));

						// TODO: make this a propper block placing mechanism, and not luck-based like it is rn
						bot.equip(bot.inventory.findInventoryItem(58), 'hand', ()=>{
							bot.placeBlock(grass, Vec3(0, 1, 0), function(err) {
								console.log('placed bench down');
								resolve(bot.blockAt(grass.position.plus(Vec3(0, 1, 0))))
							});
						});
					})
				}), 1000);
			}, 1000)
		})
			// 		}, 1000)
			// 	})}, 1000)
			// })}, 1000);
	}

	bot.once('spawn', () => {
	  mineflayerViewer(bot, { port: 3000 }) // Start the viewing server on port 3000

	  // Draw the path followed by the bot
	  const path = [bot.entity.position.clone()]
	  bot.on('move', () => {
	    if (path[path.length - 1].distanceTo(bot.entity.position) > 1) {
	      path.push(bot.entity.position.clone())
	      bot.viewer.drawLine('path', path)
	    }
	  })
	})
	bot.on('spawn', function() {
		console.log('statring')
		bot.gameplay.stopAll();
		sleep(1000);
		console.log('collecting wood for resources')
		bot.gameplay.collectBlock(
	        {
	          blockType: 'log',
	          distance: 320
	        },
	        err => {
	            err ? (()=>{
	            	bot.gameplay.stopAll();
	            	console.log('STOPPING!!!');
	            	console.log(err);
	            })() : console.log('not an error!')
	            // Discord.sendMessage('> No trees found in .')
	        }
      	)

		currDeathCount = deathCount
      	setTimeout(()=>{
      		if (pickAquired == true && deathCount == currDeathCount) {

      		}
      	}, 60000)
	})
}

function sleep (time) {
	time_till_ok = Date.now() + time;
	while (time_till_ok - Date.now() >= 0) {

	}
}

function Walk(bot, goal) {
	return new Promise((resolve)=> {
		eventListener = ((goal)=>{
			(_goal)=> {
				if (_goal == goal) {
					bot.removeListener('goal_reached', eventListener)
					resolve()
				}
			}
		})
		bot.on('goal_reached', eventListener) 
		const mcData = require('minecraft-data')(bot.version)
		const defaultMove = new Movements(bot, mcData)

		bot.pathfinder.setMovements(defaultMove)
		bot.pathfinder.setGoal(goal)		

	})
}

