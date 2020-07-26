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

	playerWoodPickCollectEvent = function(collector, collected) {
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
				setTimeout(()=>{
				table = makeCraftTable(bot, 58).then((table)=>{
					craftWoodPick(table).then(()=>{
						pickAquired = true;
						console.log('Pickaxe aquired');
						bot.removeListener('playerCollect', playerWoodPickCollectEvent);

						// TODO: bind stone miner listener
					});					
				})}, 500);
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
		}
	}

	bot.on('playerCollect', playerWoodPickCollectEvent)

	bot.on('death', function() {
		console.log('fuck. i died.')
		pickAquired = false;
		logCollected = 0;
		bot.gameplay.stopAll();
	    sleep(10000);
	    deathCount += 1
	})

	function craftWoodPick(tableBlock) {
		return new Promise((resolve)=>{
			recipe = bot.recipesFor(280);
			bot.craft(recipe[0], 1, tableBlock,()=>{
				recipe = bot.recipesFor(270);
				bot.craft(recipe[0], 1, tableBlock, ()=>{
					resolve()
				});
			});
			
		})

	}

	function makeCraftTable() {
		return new Promise((resolve)=>{
			sleep(1000);
			result = null;
			recipe = bot.recipesFor(5);
			console.log('getting recipe for planks');
			bot.gameplay.stopAll();
			console.log('waiting 1 second to stop strategies');
			setTimeout(()=>{
				bot.craft(recipe[0], 3, null, function(err) {
					if (err) console.log(err)
					console.log('crafted planks');
					console.log('getting recipe for bench')
					recipe = bot.recipesFor(58);
					bot.craft(recipe[0], 1, null, (err2)=> {
						if (err2) console.log(err2)
						console.log('crafted bench')
						done = false;

						grass = bot.findBlock({ point: bot.entity.position, matching: 2 });
						// bot.pathfinder.setGoal(new GoalNear(grass.position.x + 1, grass.position.y, grass.position.z + 1, 2.5));

						// TODO: make this a propper block placing mechanism, and not luck-based like it is rn
						bot.equip(bot.inventory.findInventoryItem(58), 'hand', ()=>{
							bot.placeBlock(grass, Vec3(0, 1, 0), function(err3) {
								if (err3) console.log(err3)
								console.log('placed bench down');
								resolve(bot.blockAt(grass.position.plus(Vec3(0, 1, 0))))
							});
						});
					})
				});
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

	mineTrees = (()=>{
			console.log(bot.gameplay.activeStrategy)
			console.log('collecting wood for resources')
			bot.gameplay.collectBlock(
				{
					blockType: 'log',
					distance: 320
				},
				err => {
					if (err) console.log(err)
					console.log('Operation complete.')
				}
			)

			currDeathCount = deathCount
		})

	bot.on('spawn', function() {
		console.log('statring')
		bot.gameplay.stopAll();
		if (bot.gameplay.activeStrategy !== null) {
			setTimeout(mineTrees, 10000)
		} else {
			mineTrees()
		}
	});
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

