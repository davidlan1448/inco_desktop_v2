import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity({ name: "coin" })
export class Coin {

    @PrimaryColumn({ nullable: false, type: "integer" })
    id_coin: number;

    @Column({ nullable: false, type: "text" })
    name: string;

    @Column({ nullable: false, type: "text" })
    code: string;
}
