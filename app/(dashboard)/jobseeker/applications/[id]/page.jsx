import ApplicationDetailsPage from "@/components/applications/ApplicationDetailsPage";

const  MyApplicationDetailsPage = async ({params}) => {
    const {id} = await params;
    return <ApplicationDetailsPage applicationId={id}/>
}

export default MyApplicationDetailsPage;

