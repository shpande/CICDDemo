const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {
    const requestId = context.awsRequestId;
    await createMsg(requestId, event).then(()=> {
        callback(null, {
            statusCode : 201,
            body : '5555',
            headers : {
                'Access-Control-Allow-Origin' : '*'
            }
        })
   }).catch((err)=>{
        console.error(err)
    });

};

function createMsg(requestId, event)
{
    const param = {
        TableName : 'Message',
        Item : {
            'messageId' : requestId,
            'message' : event
        }
    }
    return ddb.put(param).promise();
}
