import defaults from "@/constants/defaults";

export async function GitHubStats() {
    const { data } = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({
            query: `
                {
                    user(login: "${defaults.username}") {
                        repositories(first: 100, privacy: PUBLIC) {
                            edges {
                                node {
                                    stargazerCount
                                    forkCount
                                }
                            }
                        }
    
                        followers {
                            totalCount
                        }
    
                        following {
                            totalCount
                        }
                    }
                }
            `
        })
    }).then(res => res.json());

    let totalFollowers = data.user.followers.totalCount;
    let totalFollowing = data.user.following.totalCount;
    let publicRepos = data.user.repositories.edges.map((edge: any) => edge.node);
    let totalRepos = publicRepos.length;
    let totalStars = publicRepos.reduce((acc: number, repo: any) => acc + repo.stargazerCount, 0);

    return (
        <div className="grid md:flex flex-col bg-secondary border-2 dark:border-slate-700 rounded-3xl p-5 gap-3 shadow-md">
            <h3 className="text-xl font-medium">GitHub Stats</h3>
            <div>
                <h4 className="text-lg font-medium">Public Repos: {totalRepos}</h4>
                <h4 className="text-lg font-medium">Followers: {totalFollowers}</h4>
                <h4 className="text-lg font-medium">Following: {totalFollowing}</h4>
                <h4 className="text-lg font-medium">Stars: {totalStars}</h4>
            </div>
        </div>
    )
}