import {Entity, Column, PrimaryColumn, createQueryBuilder} from "typeorm";

@Entity({ name: "user" })
export class User {

    @PrimaryColumn({ nullable: false, type: "integer", name: "id_user" })
    idUser: number;

    @Column({ nullable: false, type: "text" })
    name: string;

    @Column({ nullable: false, type: "text", name: "lastname" })
    lastName: string;

    @Column({ nullable: false, type: "text" })
    token: string;

    @Column({ nullable: false, type: "text" })
    username: string;

    @Column({ nullable: false, type: "text" })
    email: string;

    @Column({ nullable: false, type: "boolean", default: false })
    authenticated: boolean;

    @Column({ nullable: true, type: "text" })
    photo: string;

    @Column({ name: "date_register" , nullable: false, type: "text" })
    dateRegister: string;

    @Column({ name: "id_coin" , nullable: false, type: "text" })
    idCoin: string;

    public static getToken(ID?: string | number) {
        return createQueryBuilder("user")
            .select("token")
            .where("authenticated = '1'")
            .getRawOne();
    }

    public static getID() {
    return createQueryBuilder("user")
        .select("id_user as ID")
        .where("authenticated = '1'")
        .getRawOne();
    }
}
