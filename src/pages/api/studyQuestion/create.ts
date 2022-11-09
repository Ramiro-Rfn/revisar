import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { question, answer, studyPlanId } = req.body

    try {
        const data = await prisma.studyQuestion.create({
            data: {
                question,
                answer,
                studyPlanId
            }
        });
        
        return res.status(201).json(data)
    } catch (error) {
        console.log(error)
    }
    
}