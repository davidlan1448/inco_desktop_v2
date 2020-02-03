import {Entity, Column, PrimaryColumn, createQueryBuilder, PrimaryGeneratedColumn} from "typeorm";

interface Update {
    idInventory?: number;
    idUser?: number;
    inventoryName?: string;
    dateUpdate?: Date;
    sync?: number;
}

@Entity({ name: "inventory",  })
export class Inventory {
    @PrimaryGeneratedColumn({ name: "id_inventory" , type: "integer" })
    idInventory: number;

    @Column({ name: "id_user", nullable: false, type: "text" })
    idUser: number;

    @Column({ nullable: false, type: "text" })
    inventoryName: string;

    @Column({ name: "date_update", nullable: false, type: "datetime" })
    dateUpdate: Date;

    @Column({ name: "date_register", nullable: false, type: "datetime" })
    dateRegister: Date;

    @Column({ nullable: false, type: "integer" })
    sync: number;

    public static updateInventory(ID: number, data: Update) {
        return createQueryBuilder()
        .update("inventory")
        .set(data)
        .where("idUser = :ID", { ID })
        .execute();
    }
}
