import { IpcMainEvent } from "electron";
import { User } from "../entitys/User";
import { Response } from "../utils/Response";
import APIGroup from "../API/APIGroup";
import { Debug } from "../utils/Debug";
import { getRepository } from "typeorm";
import { Group } from "../entitys/Group";

const groupRepo = getRepository(Group);

/**
 * @description obtiene los grupos de el usuario
 */
export const getGroups = async (evt: IpcMainEvent, args: any) => {
    try {
        get(evt);
        const user = await User.getID();
        if (!user) return;

        const res = await APIGroup.getGroups(user.ID);
        const { data: { data } } = res;
        await groupRepo.save(data);

        get(evt);
    } catch (err) {
        Debug("groupController", "getGroups", err, null, "ERROR");
        get(evt);
    }
}

const get = async (evt: IpcMainEvent) => {
    const user = await User.getID();
    if (!user) return;
    const groups = await groupRepo.find({ where: { idUser: user.ID } });

    evt.reply("onGetGroups", Response(true, groups));
}
