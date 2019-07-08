namespace Domino.Tests

open System
open NUnit.Framework

[<TestFixture>]
type TestClass () =

    [<Test>]
    member this.TestMethodPassing() =
        Assert.True(true)

    [<Test>]
     member this.FailEveryTime() = Assert.True(false)

// Learn more about F# at http://fsharp.org
// open NUnit.Framework

// open System

// [<Test>]
// let ``When 2 is added to 2 expect 4``() =
//     Assert.AreEqual(4, 2+2)

// [<EntryPoint>]
// let main argv =
//     printfn "Hello World from F#!"
//     0 // return an integer exit code
