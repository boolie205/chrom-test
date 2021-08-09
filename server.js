var vcf = require('bionode-vcf');
var args = process.argv.slice(2);

vcf.read("./input_tiny.vcf");
vcf.on('data', function(feature) {
    if (feature.chr == args[0] && feature.pos == args[1]) {
        console.log(`the allele is: ${feature.ref}`);
        //ideally I would like to interrupt the read here but i'm, not sure this is possible.
    }
});

//basic error handling. 
vcf.on('error', function(err) {
    console.error('it\'s not a vcf', err)
})
     
//questions
// What are the limitation/problems with this solution? - other than the file name being a magic string and requiring the file to be in the root dir of the project.
//It also currently doesnt check if the arguments exist / are valid arguments. 
//Currently, it only takes one input at a time. This would severely impact time taken to check a batch
///this limitation could be solved by reading from a csv file of chromosomes and positions, and returning all matches. OR adapting this into a REST API 


// How would it scale? - Badly, If i had to search thousands of these pairs I would need to paste that data into the terminal. Typically termianls dont deal well with big data
// The process would be cluncky and take a long time. Ideally, this is solved by creating a microserviced REST api with a clean front end that takes either one, or many of these 
//pairs. 


// How would you test it efficiently? 
//I would, in a more advanced example, write unit tests for the various components of the API.
// Ensuring that the file type is correct, it is valid in format and the data returned is correct
