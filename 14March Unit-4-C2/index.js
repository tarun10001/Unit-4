const express = require('express');
const app = express();

const mongoose = require("mongoose");
const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/14march Unit-4-C2");
}

app.listen(5000, async() => {
    try {
        await connect();
    } catch (err) {
        console.log(err);
    }
    console.log('listening on port 5000');
});

// -------------------------------------------------
// user
const userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        middleName: {type: String, required: false},
        lastName: {type: String, required: true},
        age: {type: Number, required: true},
        email: {type: String, required: true},
        address: {type: String, required: true},
        gender: {type: String, required: false}, // should default to female
        type: {type: String, required: false} // can take value of customer or employee and if not provided then default to customer
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const User = mongoose.model("user",userSchema);

// branch
const branchSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        IFSC: {type: String, required: true},
        MICR: {type: Number, required: true},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const BranchDetail = mongoose.model("branch",branchSchema);

// master account
const masterSchema = new mongoose.Schema(
    {
        balance: {type: Number, required: true},
        accountOwner: {type: String, required: true}, // userId of account owner goes here
        nominees: {type: Object, required: false},
        relationshipManager: {type: String, required: true}, // userId of employee goes here
        branch: {type: String, required: true},
        savingsAccount: {type: Object, required: true},
        fixedAccounts: {type: Object, required: true}
    },
    {
        timestamps: true,
        versionKey: false 
    }
);

const MasterAccount = mongoose.model("master-account",masterSchema);

// savings account
const savingsSchema = new mongoose.Schema(
    {
        accountOwner: {type: String, required: true}, // userId of account owner goes here
        account_number: {type: Number, required: true, unique: true},
        balance: {type: Number, required: true},
        interestRate: {type: Number, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const SavingsAccount = mongoose.model("savings-account",savingsSchema);

// fixed account
const fixedSchema = new mongoose.Schema(
    {
        accountOwner: {type: String, required: true}, // userId of account owner goes here
        account_number: {type: Number, required: true, unique: true},
        balance: {type: Number, required: true},
        interestRate: {type: Number, required: true},
        startDate: {type: Date, required: true},
        maturityDate: {type: Date, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const FixedAccount = mongoose.model("fixed-account",fixedSchema);

// -----------------------------------------------------------
// APIs

// 1.
app.get("/MasterAccounts", async(req,res) => {
    try {
        const accounts = await MasterAccount
            .find()
            .populate('accountOwner')
            .lean()
            .exec();
        return res.status(200).send(accounts);
    } catch (err) {
        return res.status(500).send({error: err});
    }
});

// 2.
app.post("/CreateSavings", async(req,res) => {
    try {
        const account = await SavingsAccount.create(req.body);
        return res.status(201).send(account);
    } catch (err) {
        return res.status(500).send({error: err});
    }
});

//  3.
app.post("/CreateFixed", async(req,res) => {
    try {
        const account = await FixedAccount.create(req.body);
        return res.status(201).send(account);
    } catch (err) {
        return res.status(500).send({error: err});
    }
});

// 4.
app.get("/MasterAccounts/:id", async(req,res) => {
    try {
        const account = await MasterAccount
            .findById(req.params.id)
            .populate({
                path: 'savingsAccount',
                select: 'account_number balance'
            })
            .populate({
                path: 'fixedAccounts',
                select: 'account_number balance'
            })
            .lean()
            .exec();
        return res.status(200).send(account);
    } catch (err) {
        return res.status(500).send({error: err});
    }
});

// 5.
app.delete("/DeleteFixed/:id", async(req,res) => {
    try {
        let account = await FixedAccount.findById(req.params.id).lean().exec();
        let balance = account.balance;
        let interest = account.interestRate;
        let days = new Date() - account.startDate;
        let amount = balance + (interest)*balance - (0.002*days);
        await MasterAccount.findByIdAndUpdate(req.params.id,{balance: balance});
        await FixedAccount.findByIdAndDelete(req.params.id);
        return;
    } catch (err) {
        return res.status(500).send(err);
    }
})

// 6.
app.post("/matureAccounts/:id", async(req,res) => {
    try {
        const balance = await FixedAccount
            .findById(req.params.id)
            .balance;
        balance += await SavingsAccount
            .findById(req.params.id)
            .balance;
        await FixedAccount
            .findByIdAndUpdate(req.params.id,{balance: 0});
        await SavingsAccount
            .findByIdAndUpdate(req.params.id,{balance: balance});
    } catch (err) {
        return res.status(500).send(err);
    }
})