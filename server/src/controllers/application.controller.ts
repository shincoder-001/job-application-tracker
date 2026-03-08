import prisma from "../utils/prisma";

/*
CREATE APPLICATION
*/
export const createApplication = async (req: any, res: any) => {
  try {
    const { company, position, status, notes } = req.body;

    const userId = req.user.id;

    const application = await prisma.application.create({
      data: {
        company,
        position,
        status,
        notes,
        userId
      }
    });

    res.json({
      message: "Application created successfully",
      application
    });

  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({
      error: "Failed to create application"
    });
  }
};


/*
GET ALL APPLICATIONS
*/
export const getApplications = async (req: any, res: any) => {
  try {

    const userId = req.user.id;

    const applications = await prisma.application.findMany({
      where: {
        userId
      },
      orderBy: {
        appliedAt: "desc"
      }
    });

    res.json(applications);

  } catch (error) {
    console.error("GET APPLICATIONS ERROR:", error);
    res.status(500).json({
      error: "Failed to fetch applications"
    });
  }
};


/*
GET SINGLE APPLICATION
*/
export const getApplication = async (req: any, res: any) => {
  try {

    const { id } = req.params;

    const application = await prisma.application.findUnique({
      where: {
        id: Number(id)
      }
    });

    res.json(application);

  } catch (error) {
    console.error("GET APPLICATION ERROR:", error);
    res.status(500).json({
      error: "Failed to fetch application"
    });
  }
};


/*
UPDATE APPLICATION
*/
export const updateApplication = async (req: any, res: any) => {
  try {

    const { id } = req.params;

    const application = await prisma.application.update({
      where: {
        id: Number(id)
      },
      data: req.body
    });

    res.json({
      message: "Application updated successfully",
      application
    });

  } catch (error) {
    console.error("UPDATE APPLICATION ERROR:", error);
    res.status(500).json({
      error: "Failed to update application"
    });
  }
};


/*
DELETE APPLICATION
*/
export const deleteApplication = async (req: any, res: any) => {
  try {

    const { id } = req.params;

    await prisma.application.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Application deleted successfully"
    });

  } catch (error) {
    console.error("DELETE APPLICATION ERROR:", error);
    res.status(500).json({
      error: "Failed to delete application"
    });
  }
};