import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { name } = req.body

    try {
        const data = await prisma.studyPlan.create({
            data : {
                name
            }
        });
        
        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
    
}