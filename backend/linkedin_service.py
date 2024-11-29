from linkedin_api import Linkedin
import sys
import json

def fetch_linkedin_profile(email, password, profile_id):
    try:
        api = Linkedin(email, password)
        
        profile = api.get_profile(profile_id)

        result = {
            "id": profile.get("profile_id"),
            "name": profile.get("firstName") + " " + profile.get("lastName"),
            "username": profile.get("public_identifier"),
            "profileImage": profile.get("profile_picture_display_image"),
            "bio": profile.get("headline"),
            "location": profile.get("geo_location"),
            "category": profile.get("industry_name", "").split(","),
            "metrics": {
                "followers": profile.get("followers_count"),
                "engagement": profile.get("engagement", 0),
                "posts": profile.get("num_posts", 0),
                "averageLikes": profile.get("average_likes", 0),
                "averageComments": profile.get("average_comments", 0),
            },
            "platform": "linkedin",
            "verified": profile.get("verified", False),
            "lastUpdated": profile.get("last_modified_time"),
        }
        return json.dumps(result)
    except Exception as e:
        return json.dumps({"error": str(e)})


if __name__ == "__main__":
    email = sys.argv[1]
    password = sys.argv[2]
    profile_id = sys.argv[3]
    print(fetch_linkedin_profile(email, password, profile_id))

# from linkedin_api import Linkedin
# import sys
# import json

# def fetch_linkedin_profile(email, password, profile_id):
#     try:
#         api = Linkedin(email, password)
        
#         profile = api.get_profile(profile_id)

#         result = {
#             "id": profile.get("profile_id"),
#             "name": profile.get("firstName") + " " + profile.get("lastName"),
#             "username": profile.get("public_identifier"),
#             "profileImage": profile.get("profile_picture_display_image"),
#             "bio": profile.get("headline"),
#             "location": profile.get("geo_location"),
#             "category": profile.get("industry_name", "").split(","),
#             "metrics": {
#                 "followers": profile.get("follower_count"),
#                 "engagement": profile.get("engagement", 0),
#                 "posts": profile.get("num_posts", 0),
#                 "averageLikes": profile.get("average_likes", 0),
#                 "averageComments": profile.get("average_comments", 0),
#             },
#             "platform": "linkedin",
#             "verified": profile.get("verified", False),
#             "lastUpdated": profile.get("last_modified_time"),
#         }
#         return json.dumps(result)
#     except Exception as e:
#         return json.dumps({"error": str(e)})


# if __name__ == "__main__":
#     email = sys.argv[1]
#     password = sys.argv[2]
#     profile_id = sys.argv[3]
#     print(fetch_linkedin_profile(email, password, profile_id))