import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/card"
import { Users, ClipboardList, Home as HomeIcon, AlertCircle } from "lucide-react"

const Home = () => {
    const stats = [
        { title: "Total Students", value: "245", icon: Users, color: "text-blue-500" },
        { title: "Pending Leaves", value: "12", icon: ClipboardList, color: "text-amber-500" },
        { title: "Available Rooms", value: "18", icon: HomeIcon, color: "text-emerald-500" },
        { title: "Urgent Issues", value: "3", icon: AlertCircle, color: "text-red-500" },
    ]

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome to the Hostel Management Admin Panel.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                +2.5% from last week
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg border-muted">
                            <span className="text-muted-foreground">Activity chart placeholder</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer border border-border/50">
                            <p className="text-sm font-medium">Approve All Pending Leaves</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer border border-border/50">
                            <p className="text-sm font-medium">Generate Monthly Report</p>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer border border-border/50">
                            <p className="text-sm font-medium">Sync Student Database</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Home
