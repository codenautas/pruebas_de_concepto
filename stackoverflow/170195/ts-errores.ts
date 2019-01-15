interface User{
    name: string
    userName: string
    id: number
    date: object
    UserInfoObject()
    RegisterUserData(info: object)

}
let db : any[] = []
class User implements User{
    name: string
    userName: string
    id: number
    date: object
    constructor(name: string, userName: string, id: number, date: object = new Date()){
        this.name = name
        this.userName = userName
        this.id = id
        this.date = date
    }
    UserInfoObject(){
        return {id: this.id, name: this.name, userName: this.userName, date: this.date }
    }
    RegisterUserData(info?: object){
        db.push(info || this.UserInfoObject())
    }
}

class premiumUser extends User{
    premium: boolean
    constructor(name: string, userName: string, id:number, date:Object = new Date(), premium: boolean = true){
        super(name,userName,id,date)
        this.premium = premium
    }
    PremiumUserInfo(){
        return {id: this.id, name: this.name, userName: this.userName, date: this.date, premium: this.premium}
    }
    RegisterUserData(){
        super.RegisterUserData(this.PremiumUserInfo())
    }
}

const jose = new premiumUser("jose","jose2018",1)
jose.RegisterUserData()
const victor = new User("victor", "victorl", 2)
victor.RegisterUserData()