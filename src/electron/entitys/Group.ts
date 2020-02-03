import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity({ name: "group" })
export class Group {
    @PrimaryColumn({ name: "id_group" ,nullable: false, type: "integer" })
    idGroup: number;

    @Column({ name: "id_inventory", nullable: false, type: "text" })
    idInventory: string;

    @Column({ nullable: false, type: "text" })
    groupName: string;
}
