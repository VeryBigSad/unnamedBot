import { Bot } from "mineflayer";
import { Block } from "prismarine-block";
import { Item } from "prismarine-item";
import { Vec3 } from "vec3";

export class Gameplay
{
    bot: Bot;

    constructor(bot: Bot);
    addStrategy(strategy: Strategy): void;

    collectBlock(options: {
        block: Block
    } | {
        blockType: string,
        distance: number
    }, cb: (err?: Error) => void): void;

    collectItem(options: {
        item: Item
    } | {
        items: Item[]
    } | {
        distance: number
    }, cb: (err?: Error) => void): void;

    waitForItemDrop(options: {
        position?: Vec3,
        maxDistance?: number,
        maxTicks?: number,
        groupItems?: boolean
    }, cb: (err?: Error) => void): void;

    waitForItemDrop(options: {
        ticks: number
    }, cb: (err?: Error, returns?: any) => void): void;
}

export class Strategy
{
    name: string;
    bot: Bot;
    active?: boolean

    constructor(name: string, bot: Bot);
    run(options: any, cb: (err?: Error, returns?: any) => void): void;
    exit(): void;
}
